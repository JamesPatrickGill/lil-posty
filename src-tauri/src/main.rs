// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::time::{Duration, SystemTime};

use serde::{Deserialize, Serialize};
use ureq::{get, Request};

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Time(#[from] std::time::SystemTimeError),
    #[error(transparent)]
    Ureq(#[from] Box<ureq::Error>),
}
//
// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![send])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Deserialize, Serialize, Debug)]
struct Header {
    key: String,
    value: String,
}

#[derive(Deserialize, Debug)]
enum Method {
    Get,
    Post,
}

#[derive(Deserialize, Debug)]
enum BodyType {
    Json,
    Plain,
}

#[derive(Deserialize, Serialize, Debug)]
struct SendResponse {
    body: String,
    duration: Duration,
    status: u16,
    size: usize,
    headers: Vec<Header>,
}

#[tauri::command]
fn send(
    method: Method,
    url: String,
    body: String,
    body_type: BodyType,
    headers: Vec<Header>,
) -> Result<SendResponse, Error> {
    let request = build_request(method, url, headers);
    match body_type {
        BodyType::Json => send_request_for_json_body(request, body),
        BodyType::Plain => todo!(),
    }
}

fn build_request(method: Method, url: String, headers: Vec<Header>) -> Request {
    match method {
        Method::Get => {
            let request = get(&url);
            headers
                .iter()
                .fold(request, |acc, header| acc.set(&header.key, &header.value))
        }
        _ => panic!("Unknown Method"),
    }
}

fn send_request_for_json_body(request: Request, body: String) -> Result<SendResponse, Error> {
    let start = SystemTime::now();
    let response_result = request.send_json(body);
    let end = SystemTime::now();
    let duration = end.duration_since(start)?;

    let response = response_result.map_err(Box::from)?;
    let status = response.status();

    let headers: Vec<Header> = response
        .headers_names()
        .into_iter()
        .map(|name| {
            let value = response.header(&name).unwrap();
            Header {
                key: name,
                value: value.into(),
            }
        })
        .collect();

    let body = response.into_string()?;
    let size = body.len();
    Ok(SendResponse {
        body,
        duration,
        status,
        size,
        headers,
    })
}
