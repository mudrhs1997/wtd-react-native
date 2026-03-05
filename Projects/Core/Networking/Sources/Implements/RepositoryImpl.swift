import Common
import Domain
import RxCocoa
import RxSwift
import UIKit

public final class RepositoryImpl: TokenRepository {
  public init() {}

  // MARK: - Fetch movie list

  //  public func fetchMovieList() -> Observable<[Movie]> {
//    guard let url = URL(string: "https://yts.mx/api/v2/list_movies.json") else { return Observable.just([]) }
//    return URLRequest.get(url: url).map { (dto: ResponseDTO) in
//      let movies = dto.data.movies.map {
//        $0.toEntity()
//      }
//      return movies
//    }.asObservable()
  //  }
//
  //  public func loadImage(from url: String) -> Observable<UIImage?> {
//    guard let url = URL(string: url) else { return Observable.just(nil) }
//    return Observable.create { observer in
//      let task = URLSession.shared.dataTask(with: url) { data, response, error in
//        if let error {
//          observer.onError(error)
//        } else if let data = data,
//                  let image = UIImage(data: data) {
//          observer.onNext(image)
//          observer.onCompleted()
//        }
//      }
//      task.resume()
//      return Disposables.create {
//        task.cancel()
//      }
//    }
  //  }
}
