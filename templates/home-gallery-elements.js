function galleryCardsTemplate(parts) {

  return parts.map(function(part) {return '<div class="gallery__item part-card" data-part-id='+part._id+'>'+
  '<div class="part-card__picture">' + ((part.image) ? '<img  src="'+ part.image +'" onerror="this.onerror=null;this.src="https://static.wixstatic.com/media/fec686_21caaf54b11b4d879c618b7bd1c018fc~mv2.png"  loading="lazy"' +
        'alt="' + part.title +'" title=' + part.applications_part_number + ' width="140px" ' +
        'data-id=' + part._id + '/>' : '<img src="https://static.wixstatic.com/media/fec686_21caaf54b11b4d879c618b7bd1c018fc~mv2.png"' +
      'loading="lazy" alt='+ part.title + '     title=' + part.applications_part_number + '       data-id='+ part._id +'   />') +   
  '</div>' +
  '<div class="part-card__list">' +
    '<table>' +
      '<tbody>' +
        '<tr class="part-card__list__tr">'+
          '<td>'+
           ' <p>Part Number: </p>'+
          '</td>'+
          '<td>' +
           ' <p>' +part.applications_part_number+ '</p>' +
         ' </td>' +
        '</tr> ' +  
        ((part.category)? ' <tr class="part-card__list__tr">' + 
            '<td>'+
              '<p>Category: </p>'+
            '</td>'+
           ' <td>' +
              '<p>' + part.category+ '</p>' +
           ' </td>' +
          '</tr>':'')  +

          ((part.subCategory)? ' <tr class="part-card__list__tr">' + 
            '<td>'+
              '<p>Sub Category: </p>'+
            '</td>'+
           ' <td>' +
              '<p>' + part.subCategory+ '</p>' +
           ' </td>' +
          '</tr>':'')  +

          ((part.applications_part_type)? ' <tr class="part-card__list__tr">' + 
            '<td>'+
              '<p>Product Type: </p>'+
            '</td>'+
           ' <td>' +
              '<p>' + part.applications_part_type+ '</p>' +
           ' </td>' +
          '</tr>':'')  +

          ((part.drive)? ' <tr class="part-card__list__tr">' + 
          '<td>'+
            '<p>Drive: </p>'+
          '</td>'+
         ' <td>' +
            '<p>' + part.drive+ '</p>' +
         ' </td>' +
        '</tr>':'')  +

        ((part.qualifiedText)? ' <tr class="part-card__list__tr">' + 
        '<td>'+
          '<p>Qualifier Text: </p>'+
        '</td>'+
       ' <td>' +
          '<p>' + part.qualifiedText+ '</p>' +
       ' </td>' +
      '</tr>':'')  +
        
      ((part.notes)? ' <tr class="part-card__list__tr">' + 
        '<td>'+
          '<p>Notes: </p>'+
        '</td>'+
       ' <td>' +
          '<p>' + part.notes+ '</p>' +
       ' </td>' +
      '</tr>':'')  +
        
      ((part.subModel)? ' <tr class="part-card__list__tr">' + 
        '<td>'+
          '<p>Sub-Models: </p>'+
        '</td>'+
       ' <td>' +
          '<p>' + part.subModel+ '</p>' +
       ' </td>' +
      '</tr>':'')  +
        
      ((part.liter)? ' <tr class="part-card__list__tr">' + 
      '<td>'+
        '<p>Base Liter: </p>'+
      '</td>'+
     ' <td>' +
        '<p>' + part.liter+ '</p>' +
     ' </td>' +
    '</tr>':'')  +

    ((part.position)? ' <tr class="part-card__list__tr">' + 
    '<td>'+
      '<p>Position: </p>'+
    '</td>'+
   ' <td>' +
      '<p>' + part.position+ '</p>' +
   ' </td>' +
  '</tr>':'')  +
        
               
      '</tbody>' +
    '</table>' +
    '<div class="part-card__link">' +
      '<a href="http://xn--znet-996a//actions/skuCrossRef?sku=' + part.sku + '">' +
      '<img src="https://static.wixstatic.com/media/fec686_7778e8ecfce44259aa5929ca90869b6e~mv2.png/v1/fill/w_274,h_84,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/z-net.png"  loading="lazy"   alt="Pricing & Availability"  width="274px"  />' +
      '</a>' +
    '</div>' +

  '</div>' +
'</div>'}).join("")

}


  
