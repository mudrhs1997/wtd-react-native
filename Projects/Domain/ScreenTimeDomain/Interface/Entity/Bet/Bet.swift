//
//  Bet.swift
//  Hooligans
//
//  Created by 정명곤 on 11/2/23.
//

import Foundation

struct Point: Codable {
  let id: UUID
  let betPoint: Int
  let pick: String
  let result: Bool
}
