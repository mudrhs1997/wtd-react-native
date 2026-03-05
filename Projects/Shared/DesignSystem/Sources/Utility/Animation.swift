//
//  Animation.swift
//  Hooligans
//
//  Created by 정명곤 on 10/27/23.
//

import Foundation
import UIKit

class Animation: NSObject, UIViewControllerAnimatedTransitioning {
  func transitionDuration(using _: UIViewControllerContextTransitioning?) -> TimeInterval {
    0.01 // Set the duration of the animation
  }

  func animateTransition(using transitionContext: UIViewControllerContextTransitioning) {
    guard let fromViewController = transitionContext.viewController(forKey: .from),
          let toViewController = transitionContext.viewController(forKey: .to)
    else {
      return
    }

    let container = transitionContext.containerView
    container.addSubview(toViewController.view)

    // Initial frame for the 'to' view controller (off the screen)
    let finalFrame = transitionContext.finalFrame(for: toViewController)
    toViewController.view.frame = CGRect(x: 200, y: 0, width: finalFrame.size.width, height: finalFrame.size.height)

    UIView.animate(withDuration: transitionDuration(using: transitionContext), animations: {
      toViewController.view.frame = finalFrame
    }) { _ in
      transitionContext.completeTransition(!transitionContext.transitionWasCancelled)
    }
  }
}
