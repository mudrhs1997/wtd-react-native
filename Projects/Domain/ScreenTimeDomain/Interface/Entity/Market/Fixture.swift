//
//  Fixture.swift
//  Hooligans
//
//  Created by 정명곤 on 10/22/23.
//

import Foundation

public struct FixtureResponse: Codable {
  let league: String
  let fixtures: [Fixture]
}

public struct Fixture: Codable {
  let id: UUID
  let league: String
  let date: String
  let stadium: String
  let home: String
  let homeScore: Int
  let away: String
  let awayScore: Int
  let time: String
  let homeAllocation: Float
  let awayAllocation: Float
  let drawAllocation: Float
  let status: String
}
