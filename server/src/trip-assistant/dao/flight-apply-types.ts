import { UserDb } from './user-types';

export interface FlightApplyDb {
  id?: number;
  uid?: string;
  passenger_name?: string;
  passenger_mobile?: string;
  departure_flight_number?: string;
  departure_time?: string;
  back_flight_number?: string;
  back_time?: string;
  ID_number?: string;
  flight_apply_submission_time?: string;
  is_flight_book_succeed?: number;
  flight_apply_update_time?: string;
  remark?: string;
  is_flight_apply_cancel?: number;
}

export interface FlightApplyUserViewDb extends FlightApplyDb, UserDb {

}

export interface FlightApplyGetRes {
  id?: number;
  uid?: string;
  enName?: string;
  jobNumber?: string;
  mobile?: string;
  passengerName?: string;
  passengerMobile?: string;
  departureFlightNumber?: string;
  departureTime?: string;
  backFlightNumber?: string;
  backTime?: string;
  IDNumber?: string;
  flightApplySubmissionTime?: string;
  isFlightBookSucceed?: number;
  flight_apply_update_time?: string;
  remark?: string;
  isFlightApplyCancel?: number;
}

export interface FlightApplyUpdateRes {
  isUpdateSuccess: boolean;
}

export interface FlightApplyDeleteRes {
  isDeleteSuccess: boolean;
}