export interface ProjectStateInterface {
  prop: boolean;
}

function state(): ProjectStateInterface {
  return {
    prop: false,
  };
}

export default state;
