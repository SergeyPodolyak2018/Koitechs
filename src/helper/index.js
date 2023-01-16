
export const sortByDate = (data)=>{
  const sortedData = data.sort((a, b) =>{
      var c = new Date(a.updated_at);
      var d = new Date(b.updated_at);
    return (c-d)>0?-1:1;
  })
  return sortedData.slice(0,10);
};

export const prepareLanguages = (data)=>{
  const preparedData = data.map(el=>el.languages_url)
  return preparedData;
};

export const prepareLanguagesPercents = (data)=>{
  let totalLines = 0;
  const tempData = {};
  data.map(el=>Object.keys(el).map((lang)=>{
    if(tempData[lang]){
      tempData[lang]+=el[lang];
    }else{
      tempData[lang]=el[lang];
    }
  }));
  Object.keys(tempData).map(key=>{
    totalLines+=tempData[key];
  });
  const final = Object.keys(tempData).map(key=>{
      const percents = tempData[key]*100/totalLines
      return {name:key, percents:percents}
    });

  return final;
};
