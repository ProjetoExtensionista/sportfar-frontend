// @ts-ignore
import api from "./api";
// @ts-ignore
import handleResponse from "../utils/handleResponse";

export interface AbsenceData {
  classroom_id: number;
  user_id: number;
  type_id: number;
}

export type AbsenceCreateData = AbsenceData;

export type AbsenceUpdateData = {
  abs_id: number;
} & Partial<AbsenceData>;

export default {
  create(data: AbsenceCreateData) {
    return handleResponse(api.post("/absence", data));
  },

  update(id: number, data: AbsenceUpdateData) {
    return handleResponse(api.patch(`/absence/${id}`, data));
  },

  save(data: AbsenceCreateData | AbsenceUpdateData) {
    return "abs_id" in data && data.abs_id
      ? this.update(data.abs_id, data)
      : this.create(data as AbsenceCreateData);
  },
};
