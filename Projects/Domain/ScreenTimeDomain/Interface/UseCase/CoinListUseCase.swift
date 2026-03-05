import RxSwift

public protocol CoinListUseCase {
  func getCoinList() -> Observable<[Coin]>
}
