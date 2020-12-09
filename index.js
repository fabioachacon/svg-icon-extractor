import fs from 'fs';
import jsdom from 'jsdom';
import fetch from "node-fetch";
import xmlserializer from 'xmlserializer';
const { JSDOM } = jsdom;

const proxy_url = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'https://ru.geptral.com/what-is-ademetionine/';
const bbc_url = 'https://www.bbc.com/portuguese';

const fetchIcons = async (url) => {
    try{
      const data = await fetch(url);
      const xmlString = await data.text();
      const dom = new JSDOM(xmlString);
      const svgList = dom.window.document.querySelectorAll("svg");
      svgList.forEach((svg, i) => {
        fs.writeFileSync(`./svgs/icon_${i}.svg`, 
        xmlserializer.serializeToString(svg),
        (err) => {
          if (err){
            throw err;
          }
          console.log('File Saved!');
        }
         );
      })
   }catch(error){
       console.log(error);
    }
}

fetchIcons(BASE_URL);