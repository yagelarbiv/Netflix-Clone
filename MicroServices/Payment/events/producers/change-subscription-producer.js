import {
  Topics,
  BaseProducer,
  ChangeSubscriptionEvent,
} from "@netflix-adea/common";

export class ChangeSubscriptionProducer extends BaseProducer {
  topic = Topics.ChangeSubscription;
  constructor(kafka) {
    super(kafka);
  }
}
export { ChangeSubscriptionEvent };