import BaseFeature
import UIKit
import RxSwift

final class OnboardingViewController: BaseViewController {
  private let viewModel: OnboardingViewModel

  private let containerView: UIView = {
    let view = UIView()
    view.translatesAutoresizingMaskIntoConstraints = false
    return view
  }()

  private let doneButton: UIButton = {
    let button = UIButton()
    button.translatesAutoresizingMaskIntoConstraints = false
    button.setTitle("Next", for: .normal)
    button.tintColor = .systemGreen
    button.backgroundColor = .systemGreen
    return button
  }()

  private var currentStep: OnboardingStep = .welcome
  private var currentView: OnboardingPage?

  private let stepViews: [OnboardingStep: OnboardingPage] = [
    .welcome: WelcomeView(),
    .complete: CompleteView(),
  ]

  init(viewModel: OnboardingViewModel) {
    self.viewModel = viewModel
    super.init(nibName: nil, bundle: nil)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override public func viewDidLoad() {
    navigationController?.isNavigationBarHidden = true
    super.viewDidLoad()
  }

  override func bindState() {
    let input = OnboardingViewModel.Input(
      tapNextButton: doneButton.rx.tap.asObservable()
    )
    let output = viewModel.transform(input: input)

    output.currentStep
      .asDriver(onErrorJustReturn: .complete)
      .drive(onNext: { step in
        self.transition(step)
      })
      .disposed(by: disposeBag)
  }

  override func bindAction() {
  }

  override func setupSubviews() {
    view.addSubview(containerView)
    view.addSubview(doneButton)
  }

  override func setupLayout() {
    NSLayoutConstraint.activate([
      containerView.topAnchor.constraint(equalTo: view.topAnchor),
      containerView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
      containerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
      containerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),

      doneButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
      doneButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
      doneButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -20),
      doneButton.heightAnchor.constraint(equalToConstant: 50),
    ])
  }
}

extension OnboardingViewController {
  private func transition(_ step: OnboardingStep) {
    if step == .complete {
      UIView.animate(withDuration: 0.75) {
        self.doneButton.setTitle("Done", for: .normal)
      }
    }
    guard let viewToShow = stepViews[step] else { return }

    viewToShow.translatesAutoresizingMaskIntoConstraints = false
    containerView.addSubview(viewToShow)
    NSLayoutConstraint.activate([
      viewToShow.topAnchor.constraint(equalTo: containerView.topAnchor),
      viewToShow.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
      viewToShow.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
      viewToShow.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
    ])

    UIView.animate(withDuration: 0.75, delay: 0, options: [.curveEaseInOut]) {
      self.currentView?.animateOut()
      self.currentView?.transform = .identity
      viewToShow.alpha = 1
      viewToShow.animateIn()
    } completion: { _ in
      self.currentView?.removeFromSuperview()
      self.currentView = viewToShow
    }
  }
}
