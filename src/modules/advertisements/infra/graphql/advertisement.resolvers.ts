import { CreateAdvertisementResolver } from '../../useCases/createAdvertisement/create-advertisement.resolver';
import { CreateAdvertisementQResolver } from '../../useCases/createAdvertisement/create-q-advertisement.resolver';

const advertisementResolvers = [CreateAdvertisementResolver, CreateAdvertisementQResolver];

export { advertisementResolvers };
