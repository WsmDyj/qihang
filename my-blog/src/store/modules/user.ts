import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login,getoauth, register, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'

export interface IUserState {
  loggedType: string;
  islogin: boolean;
  token: string;
  autograph: string;
  avatar: string;
  company: string;
  job: string;
  nickname: string;
  username: string;
}
export interface IRegister {
  username: string
  nickname: string
  code: string
  password: string
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public loggedType = "register";
  public islogin = false;
  public token = getToken() || "";
  public autograph = "";
  public avatar = "";
  public company = "";
  public job = "";
  public nickname = "";
  public username = "";

  @Mutation
  private SET_LoggedType(loggedType: string) {
    this.loggedType = loggedType;
  }

  @Mutation
  private SET_Login(islogin: boolean) {
    this.islogin = islogin;
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_AUTOGRAPH(autograph: string) {
    this.autograph = autograph;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }
  @Mutation
  private SET_COMPANY(company: string) {
    this.company = company;
  }
  @Mutation
  private SET_JOB(job: string) {
    this.job = job;
  }
  @Mutation
  private SET_NICKNAME(nickname: string) {
    this.nickname = nickname;
  }
  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo;
    username = username.trim();
    try {
      const { data } = await login({ username, password });
      setToken(data.accessToken);
      this.SET_TOKEN(data.accessToken);
      this.SET_Login(false);
    } catch (error) {
      return error;
    }
  }
  @Action
  public async oauthLogin(code: string) {
    const { data } = await getoauth({ code });
    setToken(data.accessToken);
    this.SET_TOKEN(data.accessToken);
    this.SET_Login(false);
    return true;
  }

  @Action async Register(userInfo: IRegister) {
    try {
      const { data } = await register(userInfo);
      setToken(data.accessToken);
      this.SET_TOKEN(data.accessToken);
      this.SET_Login(false);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Action
  public ResetToken() {
    removeToken();
    this.SET_TOKEN("");
  }

  @Action
  public handleLoggedType(params: string) {
    this.SET_LoggedType(params);
  }

  @Action
  public handleIslogin(params: boolean) {
    this.SET_Login(params);
  }

  @Action
  public async GetUserInfo() {
    const { data } = await getUserInfo();
    if (!data) {
      throw Error("Verification failed, please Login again.");
    }
    const { autograph, avatar, company, job, nickname, username } = data;
    this.SET_AUTOGRAPH(autograph);
    this.SET_AVATAR(avatar);
    this.SET_COMPANY(company);
    this.SET_JOB(job);
    this.SET_NICKNAME(nickname);
    this.SET_USERNAME(username);
  }
}

export const UserModule = getModule(User)