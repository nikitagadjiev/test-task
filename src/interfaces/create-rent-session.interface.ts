// This interface describes http response of POST /session
export interface CreateRentSession {
  car_id: number;
  tariff_id: number;
  discount_id: number;
  from_date: Date;
  to_date: Date;
}
