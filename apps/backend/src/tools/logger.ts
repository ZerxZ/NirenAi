import { Logestic } from "logestic"

export const LOGESTIC = Logestic.preset("commontz")

export const LOGGER =  LOGESTIC.decorator.logestic;