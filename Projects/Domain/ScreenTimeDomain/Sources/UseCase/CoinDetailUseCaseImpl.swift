import CoinDomainInterface
import RxSwift

public final class CoinDetailUseCaseImpl: CoinDetailUseCase {
  private let coinDetailRepository: CoinDetailRepository

  init(coinDetailRepository: CoinDetailRepository) {
    self.coinDetailRepository = coinDetailRepository
  }

  public func getCoinDetail(of coinId: String) -> Observable<Coin> {
    coinDetailRepository.getCoinDetail(of: coinId)
  }
}
