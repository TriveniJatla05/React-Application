import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: #1c1c1c;
  padding: 0 20px;
  box-sizing: border-box;

  .row{
    float:right;
    color: #ffffff;
    
  }
  .userIcon{
    font-size: 25px
  }
  p{
    font-size: 15px;
    margin-right: 15px;
  }
  .header-content {
    max-width: 1280px;
    min-height: 120px;
    padding: 20px 0px;
    margin: 0 auto;
    box-sizing: border-box;

    @media screen and (max-width: 500px) {
      max-width: 1280px;
      min-height: 0px;
    }
  }
`;

export const StyledRMDBLogo = styled.img`
  width: 250px;
  margin-top: 20px;

  @media screen and (max-width: 500px) {
    width: 150px;
    margin-top: 5px;
  }
`;

// export const StyledTMDBLogo = styled.img`
//   width: 122px;
//   margin-top: 25px;
//   float: right;

//   @media screen and (max-width: 500px) {
//     display: inline-block;
//     width: 80px;
//     margin-top: 0px;
//   }
// `;

export const StyledTMDBLogo = styled.div`
  width: 122px;
  float: right;
  color: #ffffff;
  display:flex;
  margin-top: 25px;
  .userIcon{
    font-size: 25px
  }
  
  h2{
    color: #ffffff;
  }
  `;
  //margin-right: 35px;
//display: flex;
//color: #FFFFFF;
//margin-top: 25px;

// li{
//   margin-top: 5px;
// }

