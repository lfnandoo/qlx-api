import { CreateAdvertisementResolver } from '../../useCases/createAdvertisement/create-advertisement.resolver';
import { FindAdvertisementResolver } from '../../useCases/findAdvertisement/find-advertisement.resolver';

const advertisementResolvers = [CreateAdvertisementResolver, FindAdvertisementResolver];

export { advertisementResolvers };
