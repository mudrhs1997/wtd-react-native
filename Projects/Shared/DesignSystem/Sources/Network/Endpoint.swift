//
//  Endpoint.swift
//  Hooligans
//
//  Created by 정명곤 on 2023/09/18.
//

import Foundation

public enum Endpoint {
  case main
  case news
  case userList
  case leagueTable
  case fixtureList
  case boardList
  case boardDetail(id: Int)
  case writeBoard
  case postList
  case chatList
  case signIn
  case signUp
  case betList
  case betting
  case myBetList
  case getReward

  var endpoint: String {
    switch self {
    case .main: "/main"
    case .news: "/news/list"
    case .userList: "/user/userList"
    case .leagueTable: "/team/listTable"
    case .fixtureList: "/fixture/list"
    case .boardList: "/board/list"
    case let .boardDetail(id): "/board/detail/\(id)"
    case .writeBoard: "/board/write"
    case .postList: "/post/list"
    case .chatList: "/chat/room"
    case .signIn: "/user/login"
    case .signUp: "/user/join"
    case .betList: "/bet/list"
    case .betting: "/point/bet"
    case .myBetList: "/user/bet"
    case .getReward: "/bet/reward"
    }
  }
}
