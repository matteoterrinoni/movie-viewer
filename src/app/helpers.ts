export const merge = function(source,...targets) {
  return (Object.assign({}, source,...targets)) as any;
  //return Object.assign(source,...targets);
}
export const complete = (spec:any) => merge(spec, {isComplete:()=>true});
import { cloneDeep, sortBy} from "lodash";
export const deepCopy = function<T>( toCopy : T) : T {

  // return JSON.parse(JSON.stringify(toCopy))
  return cloneDeep(toCopy)
}