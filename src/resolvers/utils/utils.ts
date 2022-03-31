export const getImage = (path: string, extension: string) => {
  if (!path || !extension) {
    return null;
  }

  return {
    portraitSmall: `${path}/portrait_small.${extension}`,
    portraitMedium: `${path}/portrait_medium.${extension}`,
    portraitXlarge: `${path}/portrait_xlarge.${extension}`,
    portraitFantastic: `${path}/portrait_fantastic.${extension}`,
    portraitUncanny: `${path}/portrait_uncanny.${extension}`,
    portraitIncredible: `${path}/portrait_incredible.${extension}`,
    standardSmall: `${path}/standard_small.${extension}`,
    standardMedium: `${path}/standard_medium.${extension}`,
    standardLarge: `${path}/standard_large.${extension}`,
    standardXlarge: `${path}/standard_xlarge.${extension}`,
    standardFantastic: `${path}/standard_fantastic.${extension}`,
    standardAmazing: `${path}/standard_amazing.${extension}`,
    landscapeSmall: `${path}/landscape_small.${extension}`,
    landscapeMedium: `${path}/landscape_medium.${extension}`,
    landscapeLarge: `${path}/landscape_large.${extension}`,
    landscapeXlarge: `${path}/landscape_xlarge.${extension}`,
    landscapeAmazing: `${path}/landscape_amazing.${extension}`,
    landscapeIncredible: `${path}/landscape_incredible.${extension}`,
    detail: `${path}/detail.${extension}`,
    fullSizeImage: `${path}.${extension}`
  };
};
