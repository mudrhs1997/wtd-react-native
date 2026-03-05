import CoinDomainInterface
import RxSwift

public struct CoinListUseCaseImpl: CoinListUseCase {
  private let coinListRepository: CoinListRepository

  init(coinListRepository: CoinListRepository) {
    self.coinListRepository = coinListRepository
  }

  public func getCoinList() -> Observable<[Coin]> {
    coinListRepository.fetchCoinList()
  }
}
