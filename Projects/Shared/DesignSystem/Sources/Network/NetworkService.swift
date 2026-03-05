//
//  NetworkService.swift
//  Hooligans
//
//  Created by 정명곤 on 2023/09/14.
//

import Combine
import Foundation
import UIKit

public enum NetworkError: Error {
  case invalidRequest
  case unknownError(message: String)
}

public enum HTTPMethod: String {
  case get
  case post
  case put
  case patch
  case delete
}

public final class NetworkService {
  static let shared = NetworkService()

  private let baseURL = "http://13.124.61.192:8080"

  func buildEndpoint(baseURL: String, _ endpoint: String) -> URL {
    guard let url = URL(string: baseURL + endpoint) else { return URL(string: "")! }

    return url
  }
}

extension NetworkService {
  func get(to endpoint: Endpoint) -> URLSession.DataTaskPublisher {
    let url = buildEndpoint(baseURL: baseURL, endpoint.endpoint)

    let request = RequestBuilder()
      .url(url: url)
      .method(.get)
      .header()
      .create()

    return URLSession(configuration: .default).dataTaskPublisher(for: request)
  }

  func post(to endpoint: Endpoint, param: [String: Any]) -> URLSession.DataTaskPublisher {
    let url = buildEndpoint(baseURL: baseURL, endpoint.endpoint)

    let request = RequestBuilder()
      .url(url: url)
      .method(.post)
      .body(param)
      .header()
      .create()

    return URLSession(configuration: .default).dataTaskPublisher(for: request)
  }

  func post(to endpoint: String, param: [String: Any]) -> URLSession.DataTaskPublisher {
    let url = buildEndpoint(baseURL: baseURL, endpoint)

    let request = RequestBuilder()
      .url(url: url)
      .method(.post)
      .body(param)
      .header()
      .create()

    return URLSession(configuration: .default).dataTaskPublisher(for: request)
  }

  func put() {}
}
