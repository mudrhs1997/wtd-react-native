//
//  Message.swift
//  Hooligans
//
//  Created by 정명곤 on 2023/10/11.
//

import Foundation

enum MessageType {
  case enter
  case talk
}

public struct Message: Codable {
  let type: String
  let roomId: String
  let sender: String
  let message: String
}
