import CoinDomainInterface
import RxSwift

public final class MockCoinListUseCase: CoinListUseCase {
  public var fetchCoinListCallCount = 0
  public var fetchCoinListReturn: [Coin] = []
  public func getCoinList() -> Observable<[Coin]> {
    fetchCoinListCallCount += 1
    return Observable.just(fetchCoinListReturn)
  }
}
