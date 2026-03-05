import RxSwift

public protocol CoinListRepository {
  func fetchCoinList() -> Observable<[Coin]>

  func fetchCandleData(of clubId: String) -> Observable<[CandleData]>
}
