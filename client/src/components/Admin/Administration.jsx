import React, { useEffect, useState, useContext  } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { getUsers} from "../../actions/users.actions";
import { getUser} from "../../actions/user.actions";
import Cookies from 'js-cookie';
import axios from 'axios';
import { CSVLink} from "react-csv";
import { UidContext } from '../AppContext';
import check from '../../img/check.svg';
import disabledIco from '../../img/disabled.svg';
import pen from '../../img/pen.svg';
import cross2 from '../../img/cross2.svg'; //choisir
import skull3 from '../../img/skull3.svg';
import heart from '../../img/heart.svg';
import cursorPointer from '../../img/cursor-pointer.png';

const Administration = () => {

    const [refreshData,setRefreshData] = useState(0);
    const uid = useContext(UidContext)
    const urole = useContext(UidContext)

    const dispatch = useDispatch ();
    //le user
    const user = useSelector((state) => state.userReducer);
    useEffect(()=>{
        dispatch(getUser())
    }, [])

    //all users
    const users = useSelector((state) => state.usersReducer);
    useEffect(()=>{
        dispatch(getUsers())
    }, [refreshData])
    

    const [role,setRole] = useState("Studio"); //add user
    const [roleUser,setRoleUser] = useState("Studio"); //modify user
    const [adressUser,setAdressUser] = useState(""); //modify user adress
    const [companyUser,setCompanyUser] = useState(""); //modify user company 
    const [modifying,setModifying] = useState('');
    
    

    const headers = [
        [ "Nom" ],
        [ "Email" ]
      ];
    const [csvData,setCsvData] = useState([]); //"firstname", "lastname", "email"
    
    // useeffect qui rempli bien les données, maintenant il faut le dl en csv
    useEffect(()=>{
        console.log("longueur")
        console.log(users.length)
        

        if(csvData.length === 0){
            for(let i = 0; i < users.length; i++){
                // console.log(users[i].email)
                setCsvData(oldArray => [...oldArray, [users[i].pseudo, users[i].email]]); 
            }
        }else{
            console.log("CSV deja rempli !")
        }
    }, [users])

    // role d'un non validé
    const handleRole = (data) =>{
        setRole(data);
        setRefreshData(refreshData+1)
    }

    //disable et enable un user
    const disable = (id) => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/admin/disable/` + id,
          }).then(response => {
            setRefreshData(refreshData+1)
          })
        
    }

    const enable = (id) => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/admin/enable/` + id,
          }).then(response => {
            setRefreshData(refreshData+1)
          })
          
    }

    // modifier le role d'un user
    const modify = (id,role,adresse,company) => {
       if(modifying === ''){
        setModifying(id)
       }else{
        setModifying('')
       }

       handleRoleUser(role)
       setAdressUser(adresse)
       setCompanyUser(company)

       setRefreshData(refreshData+1)
    }

    // valider la modification du user
    // on attends la modif du back pour envoyer les données
    const setModify = (id) => {
        setModifying('')
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/admin/update/` + id,
            data: {role:roleUser,adresse:adressUser, company:companyUser}
          }).then(response => {
            setRefreshData(refreshData+1)
          })
    }

    //quand role modifié dans liste déroulante
    const handleRoleUser = (data) =>{
        setRoleUser(data);
    }

    //quand l'adresse est modifiée
    const handleAdressUser = (data) =>{
        setAdressUser(data);
    }

    //quand la company est modifiée
    const handleCompanyUser = (data) =>{
        setCompanyUser(data);
    }
    
    //valider le role d'un nouveau user
    const validate = (id) => {
        return axios({
            method:"patch",
            headers : { Authorization : "Bearer "+Cookies.get('jwt') },
            url: `${process.env.REACT_APP_API_URL}api/user/admin/update/` +id,
            data: {role:role}
          }).then(response => {
            setRefreshData(refreshData+1)
          })
    }

    //supprimer un user definitivement
    const deleteUser = (id) => {
        if (window.confirm("GAME OVER: Voulez-vous supprimer cet utilisateur de manière définitive?")) {
            return axios({
                method:"delete",
                headers : { Authorization : "Bearer "+Cookies.get('jwt') },
                url: `${process.env.REACT_APP_API_URL}api/user/` + id
              }).then(response => {
                setRefreshData(refreshData+1)
              })
        } 
    }

    // bloc info admin
    const showHTD = () => { //a mettre en react 
        if(document.getElementById("howToDoContent").style.display === "none" || document.getElementById("howToDoContent").style.display === '' || document.getElementById("howToDoContent").style.display === null){
            document.getElementById("howToDoContent").style.display = "block";
        }else{
            document.getElementById("howToDoContent").style.display = "none";
        }
    };


    return (
         <>
         {/* {console.log("combien de return?")} */}
         {/* {user.isAdmin !== undefined && user.isAdmin === true ? */}
         {uid && urole ? 
        <div className="administrationContainer">
            <div className="adminBigBlock">
                <div className="howToDoContainer">
                    <div id="howToDoContent">
                        <p><b>Aide pour admin</b></p>
                        <p>Cette section est divisée en trois parties:</p>
                        {/* <ol className="ordonnedList">
                            <li>Utilisateurs en attentes</li>
                            <li>Utilisateurs validés</li>
                            <li>Utilisateurs désactivés</li>
                        </ol> */}
                        <p>
                            <b>1. Utilisateurs en attentes</b><br/>
                            - Ici sont répertoriés les utilisateurs qui ont créé un compte mais n'ont pas encore accès au site. <br/>
                            - Pour leur donner accès il vous suffit de cliquer sur l'icone <img className="adminIconEvent" src={check} alt="add" title="Valider la demande"/>. <br/>
                            - Pour refuser la demande et donc supprimer leur compte définitivement, cliquez sur <img className="adminIconEvent" src={cross2} alt="delete" title="Supprimer la demande"/> <br/><br/>
                        </p>
                        <p>
                            <b>2. Utilisateurs validés</b><br/>
                            - Ici sont répertoriés les utilisateurs qui ont créé un compte et ont été validé par un admin. Ils ont libre accès au site.<br/>
                            - Pour désactiver un compte, cliquez sur l'icone  <img src={disabledIco} alt="poubelle" title="Désactiver" className="adminIconEvent"/>. <br/>
                            - Pour modifier le rôle d'un compte cliquez sur l'icone <img src={pen} alt="crayon" title="Modifier" className="adminIconEvent"/>, puis validez les modifications avec l'icone <img src={check} alt="valider" title="Valider la modification" className="adminIconEvent"/>.<br/><br/>
                        </p>
                        <p>
                            <b>3. Utilisateurs désactivés</b><br/>
                            - Ici sont répertoriés les utilisateurs qui ont été désactivés. Ils n'ont plus accès au site.<br/>
                            - Pour ré-activer un utilisateur, appuyez sur <img src={heart} alt="poubelle" title="Ré-activer" className="adminIconEvent"/>.<br/>
                            - Pour supprimer définitivement un utilisateur, appuyez sur  <img className="adminIconEvent" src={skull3} alt="delete" title="Supprimer l'utilisateur DEFINITIVEMENT"/>.<br/><br/>
                        </p>
                    </div>
                    <div className="howToDo">
                        <div onClick={() => showHTD()}>
                            <img src={cursorPointer} alt="info" title="Plus d'infos" className="adminIconEvent"/>
                            <b>Comment faire ?</b>
                        </div>
                        <div>
                            <img src={cursorPointer} alt="info" title="Télécharger les emails" className="adminIconEvent"/>
                            <CSVLink data={csvData} headers={headers}><b>Télécharger les emails</b></CSVLink>
                        </div>
                    </div>
                </div>
                <div className="adminSubTitle">
                    <b>Utilisateurs en attente</b>
                </div>
                <div className="adminBlock">
                    <div className="adminSectionActionsTitle">
                        Actions
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Nom
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Company
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Rôle
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.isValid === true && val.role === '' ?
                    <div className="adminBlock">
                        <div className="adminActions">
                            <img className="adminIconEvent" src={check} alt="add" title="Valider la demande" onClick={() => validate(val._id)}/>
                            <img className="adminIconEvent" src={cross2} alt="delete" title="Supprimer la demande"  onClick={() => deleteUser(val._id)}/>
                        </div>
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">{val.company}</div>
                        <div className="adminSection">
                            <select className="adminRoleSelect" onChange={(e) => handleRole(e.target.value)}>
                                <option value="Studio" selected>Studio</option>
                                <option value="Expert">Expert</option>
                                <option value="Sponsor">Sponsor</option>
                                <option value="Partenaire">Partenaire</option>
                            </select>
                        </div>
                    </div>
                     :
                     ''
                     }
                    </>
                    )          
                })}
            </div>
            <div className="adminBigBlock">
                <div className="adminSubTitle">
                    <b>Utilisateurs validés</b>
                </div>
                <div className="adminBlockHeader">
                    <div className="adminSectionActionsTitle">
                        Actions
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Nom
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Email
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Rôle
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Adresse
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Company
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Membres
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.role !== '' && val.isDisabled !== true && val._id !== user._id ?
                    <div key={val._id} className="adminBlock">
                        <div className="adminActions">
                            <img src={disabledIco} alt="poubelle" title="Désactiver" className="adminIconEvent" onClick={() => disable(val._id)}/>
                            {modifying === val._id ?
                                <img src={check} alt="valider" title="Valider la modification" className="adminIconEvent" onClick={() => setModify(val._id)}/>
                                :
                                <img src={pen} alt="crayon" title="Modifier" className="adminIconEvent" onClick={() => modify(val._id,val.role,val.adresse,val.company)}/>
                            }
                            
                        </div>
                        <div className="adminSection disable"><div>{val.pseudo}</div></div>
                        <div className="adminSection disable"><div>{val.email}</div></div>
                        <div className="adminSection">
                            <select className="adminRoleSelect" onChange={(e) => handleRoleUser(e.target.value)} disabled={modifying !== '' && modifying === val._id ? '' : 'disabled' }>
                                <option value="Studio" selected={val.role === "Studio" ? "selected" : ""}>Studio</option>
                                <option value="Expert" selected={val.role === "Expert" ? "selected" : ""}>Expert</option>
                                <option value="Sponsor" selected={val.role === "Sponsor" ? "selected" : ""}>Sponsor</option>
                                <option value="Partenaire" selected={val.role === "Partenaire" ? "selected" : ""}>Partenaire</option>
                            </select>    
                        </div>
                        <div className="adminSection">
                           <input type="text" defaultValue={val.adresse} onChange={(e) => handleAdressUser(e.target.value)} disabled={modifying !== '' && modifying === val._id ? '' : 'disabled' } className={modifying !== '' && modifying === val._id ? 'modifying' : ''}/> 
                        </div>
                        <div className="adminSection">
                            <input type="text" defaultValue={val.company} onChange={(e) => handleCompanyUser(e.target.value)} disabled={modifying !== '' && modifying === val._id ? '' : 'disabled' } className={modifying !== '' && modifying === val._id ? 'modifying' : ''}/>
                        </div>
                        <div className="adminSection disable"><div>{val.membres}</div></div>
                    </div>
                    : ''}
                    </>
                    )          
                })}
            </div>

            <div className="adminBigBlock">
                <div className="adminSubTitle">
                    <b>Utilisateurs désactivés</b>
                </div>
                <div className="adminBlock">
                    <div className="adminSectionActionsTitle">
                        Actions
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Nom
                    </div>
                    <div className="adminSection adminSectionTitle">
                        Rôle
                    </div>
                </div>
                {users.map((val)=>{
                return(
                    <>
                    {val.isDisabled === true ?
                    <div key={val._id} className="adminBlock disable">
                        <div className="adminActions">
                            <img src={heart} alt="poubelle" title="Ré-activer" className="adminIconEvent"  onClick={() => enable(val._id)}/>
                            <img className="adminIconEvent" src={skull3} alt="delete" title="Supprimer l'utilisateur DEFINITIVEMENT"  onClick={() => deleteUser(val._id)}/>
                        </div>
                        <div className="adminSection">{val.pseudo}</div>
                        <div className="adminSection">{val.role}</div>
                    </div>

                     : ''
                     }
                    </>
                    )          
                })}
            </div>
            
            {/* <Csv /> */}
           
        </div>
        :
        '' //il faudra faire ça sur la navbar aussi
        //mais du coup en fait ça marche vu que le render se fait plusieurs fois et que le dernier render a tjrs les infos chargées, pas besoin du useeffect comme dans home (meme si le useeffect permet de mettre un loading jusqu'a ce que les données soient chargées)
        // <Redirect to='/' /> 
        }
        </>
    );
};

export default Administration;