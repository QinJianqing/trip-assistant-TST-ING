import { UserDb } from './user-types';

export interface VehicleArrangeDb {
  id?: number;
  uid?: string;
  passenger_mobile?: string;
  driver_name?: string;
  driver_mobile?: string;
  voiture_number?: string;
  voiture?: string;
  voiture_color?: string;
  seats?: number;
  departure_time?: string;
  is_arrange?: number;
  remark?: string;
  add_time?: string;
  update_time?: string;
  is_vehicle_arrange_cancel?: number;
}

export interface VehicleApplyVehicleArrangeUserViewDb extends VehicleArrangeDb, UserDb {

}

export interface VehicleArrangeGetRes {
  id?: number;
  uid?: string;
  enName?: string;
  jobNumber?: string;
  mobile?: string;
  passengerName?: string;
  passengerMobile?: string;
  vehicleApplyDeparturePlace?: string;
  vehicleApplyReachPlace?: string;
  vehicleApplyIsRound?: number;
  vehicleApplyDetailPlace?: string;
  flightNumber?: string;
  flightDepartureTime?: string;
  flightReachTime?: string;
  costCenter?: string;
  projectBudgetNo?: string;
  vehicleApplySubmissionTime?: string;
  driverName?: string;
  driverMobile?: string;
  voitureNumber?: string;
  voitureType?: string;
  voitureColor?: string;
  voitureSeats?: number;
  remainingSeats?: number;
  vehicleArrangeDepartureTime?: string;
  vehicleArrangeDeparturePlace?: string;
  vehicleArrangeReachPlace?: string;
  vehicleArrangeIsRound?: number;
  isVehicleArrange?: number;
  remark?: string;
  vehicleArrangeAddTime?: string;
  vehicleArrangeUpdateTime?: string;
  isVehicleArrangeCancel?: number;
}

export interface VehicleArrangeUpdateRes {
  isUpdateSuccess: boolean;
}

export interface VehicleArrangeDeleteRes {
  isDeleteSuccess: boolean;
}