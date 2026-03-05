import Combine
import Domain
import Foundation

final class AccountService {
//    func signIn(account: String, password: String) -> AnyPublisher<User, Error> {
//        let params = [
//            "account": account,
//            "password": password
//        ] as [String: Any]
//
//        return NetworkService.shared.post(to: .signIn, param: params)
//            .tryMap { data, response in
//                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
//                    print("http error\(String(data: data, encoding: .utf8))")
//                    throw URLError(.badServerResponse)
//                }
//
//                return data
//            }
//            .decode(type: User.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//    }
//
//    func signUp(name: String, account: String, password: String, nickName: String, phoneNumber: String, birth: String, firstTeam: String) -> AnyPublisher<ResponseMessage, Error> {
//        let params = [
//            "name": name,
//            "nickname": nickName,
//            "account": account,
//            "password": password,
//            "phoneNumber": phoneNumber,
//            "birth": birth,
//            "firstTeam": firstTeam
//        ] as [String: Any]
//
//        return NetworkService.shared.post(to: .signUp, param: params)
//            .tryMap { data, response in
//                print(String(data: data, encoding: .utf8))
//                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
//                    print("http error \(String(data: data, encoding: .utf8))")
//                    throw URLError(.badServerResponse)
//                }
//
//                return data
//            }
//            .decode(type: ResponseMessage.self, decoder: JSONDecoder())
//            .eraseToAnyPublisher()
//
//    }
}
