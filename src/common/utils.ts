

export type Application = {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
}

export type Layer1Type = {
  name: string;
  children: string[];
  grandChildren: Application[];
}

export type Layer2Type = {
  name: string;
  children: Layer1Type[];
  grandChildren: Application[];
}

/**
 * A util function that creates a multi level tree out of a flat array of objects
 * @param list The flat array of objects
 * @param key The array of keys to use as an index
 * @returns 
 */
export const groupByKey = (list: Application[], keys: string[]) => {
  let key = keys[0];
  if (!key) return list;
  let values = Object.values(
    list.reduce((hash: any, obj: any) => {

      if (!hash[obj[key]]) {
        hash[obj[key]] = { name: obj[key], children: [] , grandChildren: [] }
      }

      hash[obj[key]].children = [...hash[obj[key]].children, obj];
      hash[obj[key]].grandChildren = [...hash[obj[key]].grandChildren, obj];

      return hash;
    }, {})
    )

  if (keys.length) {
    values.forEach((name: any) => {
      name.children = groupByKey(name.children, keys.slice(1))
    })
  }
  return values;
}


/**
 * Util function that sorts a tree, by layer name
 * @param data The tree array
 * @returns 
 */
export const sortLayers = (data: any[] ) => {
  return data.sort((a: Layer1Type, b: Layer1Type) => a.name.localeCompare(b.name, undefined,
    { numeric: true, sensitivity: 'base' }))
}
