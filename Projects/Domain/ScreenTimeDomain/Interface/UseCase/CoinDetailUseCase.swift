import RxSwift

public protocol CoinDetailUseCase {
  func getCoinDetail(of coinId: String) -> Observable<Coin>
}
