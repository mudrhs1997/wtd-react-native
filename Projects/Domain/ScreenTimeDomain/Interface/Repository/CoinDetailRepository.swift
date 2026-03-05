import RxSwift

public protocol CoinDetailRepository {
  func getCoinDetail(of coinId: String) -> Observable<Coin>
}
