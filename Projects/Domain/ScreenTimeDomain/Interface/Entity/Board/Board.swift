//
//  Board.swift
//  Hooligans
//
//  Created by Joseph on 2023/09/26.
//

import Foundation
import UIKit

public struct Board: Codable {
  let id: Int
  let nickname: String
  let title: String
  let content: String
  let commentCount: Int
  let heartCount: Int
  let view: Int
  let modified: Bool
  let boardDate: String
  let comments: [Comment]?
}

public struct Comment: Codable {
  let id: UUID
  let nickname: String
  let comment: String
}

public struct Post: Codable {}
