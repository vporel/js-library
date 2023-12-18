/**
 * Génère une chaine de classes à partir de différentes variables
 *
 * @param  {...string|null} classnames
 */
 export function classNames(...classnames) {
    return classnames.filter((classname) => classname !== null && classname !== false).join(" ");
  }