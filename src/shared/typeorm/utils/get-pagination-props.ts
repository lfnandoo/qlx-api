import { OrderDirectionEnum } from '../../../type-utils/enums/order-direction.enum';

function getPaginationProps({
  page,
  pageSize,
  orderDirection,
  orderColumn,
}: {
  page: number;
  pageSize: number;
  orderDirection: OrderDirectionEnum;
  orderColumn: string;
}) {
  const props = {
    skip: page * pageSize,
    take: pageSize,
    order: {
      [orderColumn]: orderDirection,
    },
  };

  return props;
}

export { getPaginationProps };
