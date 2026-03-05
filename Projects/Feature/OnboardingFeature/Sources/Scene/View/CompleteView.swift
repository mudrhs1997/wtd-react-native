import UIKit
import RxSwift
import RxCocoa

final class CompleteView: UIView {
  private let disposeBag = DisposeBag()

  private let completeLabel: UILabel = {
    let label = UILabel()
    label.translatesAutoresizingMaskIntoConstraints = false
    label.text = "You're all set! 🎉"
    label.font = .boldSystemFont(ofSize: 24)
    label.textColor = .white
    label.textAlignment = .center
    label.alpha = 0
    return label
  }()
  


  init() {
    super.init(frame: .zero)
    setSubviews()
    setLayout()
  }

  required init?(coder: NSCoder) {
    fatalError()
  }

  
}

extension CompleteView {
  private func setSubviews() {
    addSubview(completeLabel)
  }

  private func setLayout() {
    NSLayoutConstraint.activate([
      completeLabel.topAnchor.constraint(equalTo: topAnchor, constant: 80),
      completeLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
      completeLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -100),
    ])
  }
}

extension CompleteView: OnboardingPage {
  func animateIn() {
    completeLabel.transform = CGAffineTransform(translationX: 0, y: -20)
    completeLabel.alpha = 1
//    UIView.animate(withDuration: 0.75, delay: 0, options: [.curveEaseInOut]) {
//      self.completeLabel.alpha = 1
//      self.completeLabel.transform = .identity
//    }
  }

  func animateOut() {
    self.completeLabel.alpha = 0
    self.completeLabel.transform = CGAffineTransform(translationX: 0, y: -40)
//    self.completeLabel.transform = .identity
//    UIView.animate(withDuration: 0.75, delay: 0, options: [.curveEaseInOut]) {
//      self.completeLabel.alpha = 0
//      self.completeLabel.transform = CGAffineTransform(translationX: 0, y: -20)
//    }
  }
}
