import { CreateAdvertisementResolver } from '../../useCases/createAdvertisement/create-advertisement.resolver';
import { FindAdvertisementResolver } from '../../useCases/findAdvertisement/find-advertisement.resolver';
import { UpdateAdvertisementResolver } from '../../useCases/updateAdvertisement/update-advertisement.resolver';

const advertisementResolvers = [
  CreateAdvertisementResolver,
  FindAdvertisementResolver,
  UpdateAdvertisementResolver,
];

export { advertisementResolvers };
