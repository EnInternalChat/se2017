import { HTTPService } from './http_helper';
import { AppGlobal } from './global_data';


export class API {
  private is_debug: boolean = true;
  public base_url: string = this.is_debug ? "" : "http://http://118.89.110.77:8080/EnInternalChat";

  constructor(
    private http: HTTPService,
    private global_data: AppGlobal) {
  }

  public login(username, password) {
    return this.http.post(this.base_url + '/login', {
      name: username,
      password: password
    }, false);
  }

  public logout() {
    return this.http.post(this.base_url + '/logout', null, true);
  }
}