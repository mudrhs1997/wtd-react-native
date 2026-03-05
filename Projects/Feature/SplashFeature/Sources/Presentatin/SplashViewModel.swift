import BaseFeature
import Foundation
import RxSwift

final class SplashViewModel: ViewModel {
  private let disposeBag = DisposeBag()
  private let router: SplashRouter

  // MARK: - Input & Output
  struct Input {
    let viewDidLoad: Observable<Void>
  }

  struct Output {

  }

  init(router: SplashRouter) {
    self.router = router
  }

  func transform(input: Input) -> Output {
    let output = Output()

    input.viewDidLoad
      .observe(on: MainScheduler.instance)
      .subscribe { _ in
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
          self.router.route(to: .main)
        }
      }
      .disposed(by: disposeBag)

    return output
  }

}
