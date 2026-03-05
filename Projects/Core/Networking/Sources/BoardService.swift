import Combine
import Domain
import Foundation

final class BoardService {
//    func fetchBoardList() -> AnyPublisher<[Board], Error> {
//
//        return NetworkService.shared.get(to: .boardList)
//            .tryMap { data, response in
//                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
//                    print("http error")
//                    throw URLError(.badServerResponse)
//                }
//
//                return data
//            }
//            .decode(type: [Board].self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
//
//    func fetchBoardDetail(id: Int) -> AnyPublisher<Board, Error> {
//
//        return NetworkService.shared.get(to: .boardDetail(id: id))
//            .tryMap { data, response in
//                print(String(data: data, encoding: .utf8))
//                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
//                    print("http error")
//                    throw URLError(.badServerResponse)
//                }
//
//                return data
//            }
//            .decode(type: Board.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
//
//    func addBoard(title: String, content: String) -> AnyPublisher<Board, Error> {
//        let params = [
//            "title": title,
//            "content": content
//        ] as [String: Any]
//        return NetworkService.shared.post(to: .writeBoard, param: params)
//            .tryMap { data, response in
//                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
//                    print("http error")
//                    throw URLError(.badServerResponse)
//                }
//
//                return data
//            }
//            .decode(type: Board.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
}
