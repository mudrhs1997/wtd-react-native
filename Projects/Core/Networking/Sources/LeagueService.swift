import Combine
import Common
import Domain
import Foundation

final class LeagueService {
//    func fetchLeagueTable() -> AnyPublisher<LeagueTable, Error> {
//
//        return NetworkService.shared.get(to: .leagueTable)
//            .tryMap { data, response in
//                guard let httpResopnse = response as? HTTPURLResponse, httpResopnse.statusCode == 200 else {
//                    print("http error")
//                    throw URLError(.badServerResponse)
//                }
//                return data
//            }
//            .decode(type: LeagueTable.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
//
//    func fetchFixtures() -> AnyPublisher<FixtureResponse, Error> {
//
//        return NetworkService.shared.get(to: .fixtureList)
//            .tryMap { data, response in
  ////                print(String(data: data, encoding: .utf8))
//                guard let httpResopnse = response as? HTTPURLResponse, httpResopnse.statusCode == 200 else {
//                    print("http error")
//                    throw URLError(.badServerResponse)
//                }
//                return data
//            }
//            .decode(type: FixtureResponse.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }

//    func fetchNewsPosts() -> AnyPublisher<NewsResponse, Error> {
//
//        return NetworkService.shared.get(to: .news)
//            .tryMap { data, response in
//                guard let httpResopnse = response as? HTTPURLResponse, httpResopnse.statusCode == 200 else {
//                    print("http error")
//                    throw URLError(.badServerResponse)
//                }
//                return data
//            }
//            .decode(type: NewsResponse.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
}
