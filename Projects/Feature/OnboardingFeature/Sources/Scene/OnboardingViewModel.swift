import BaseFeature
import RxSwift

enum OnboardingStep: Int, CaseIterable {
  case welcome
  case complete

  var next: OnboardingStep? {
    let all = Self.allCases
    guard let idx = all.firstIndex(of: self), idx + 1 < all.count else { return nil }
    return all[idx + 1]
  }

  var title: String {
    switch self {
      case .welcome
      return "Next"
    case .complete:
      return "Done"
    }
  }
}


final class OnboardingViewModel: ViewModel {
  private var disposeBag = DisposeBag()
  private let currentStepRelay = BehaviorSubject<OnboardingStep>(value: .welcome)

  // MARK: - Input & Output
  struct Input {
    let tapNextButton: Observable<Void>
  }

  struct Output {
    let currentStep: Observable<OnboardingStep>
  }


  func transform(input: Input) -> Output {
    input.tapNextButton
      .withLatestFrom(currentStepRelay)
      .compactMap { step in
        step.next
      }
      .bind(to: currentStepRelay)
      .disposed(by: disposeBag)

    return Output(currentStep: currentStepRelay.asObservable())
  }
}
