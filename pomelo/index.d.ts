//import { Socket } from "net";
import { EventEmitter } from "events";
import { Socket } from "net";

export const version: string;
export const app: Application;

export const connectors: {
  readonly hybridconnector: new (
    port: number,
    host: string,
    opts?: object
  ) => Connector;
  readonly sioconnector: new (
    port: number,
    host: string,
    opts?: object
  ) => Connector;
  readonly udpconnector: new (
    port: number,
    host: string,
    opts?: object
  ) => Connector;
  readonly mqttconnector: new (
    port: number,
    host: string,
    opts?: object
  ) => Connector;
};
export const pushSchedulers: {
  readonly direct:new(app:Application, opts?:object)=>DirectPushScheduler;
  readonly buffer:new(app:Application, opts?:object)=>BufferPushScheduler;
};
export const events: {
  readonly ADD_SERVERS: string;
  readonly REMOVE_SERVERS: string;
  readonly REPLACE_SERVERS: string;
  readonly BIND_SESSION: string;
  readonly UNBIND_SESSION: string;
  readonly CLOSE_SESSION: string;
  readonly ADD_CRONS: string;
  readonly REMOVE_CRONS: string;
  readonly START_SERVER: string;
  readonly START_ALL: string;
};

export const components: {
  readonly backendSession: (app: Application) => BackendSessionService;
  readonly channel: (app: Application, opts?: object) => ChannelService;
  readonly connection: (app: Application) => ConnectionComponent;
  readonly connector: (app: Application, opts?: object) => ConnectorComponent;
  readonly dictionary: (app: Application, opts?: object) => DictionaryComponent;
  readonly master: (app: Application, opts?: object) => MasterComponent;
  readonly monitor: (app: Application, opts?: object) => MonitorComponent;
  readonly protobuf: (app: Application, opts?: object) => ProtobufComponent;
  readonly proxy: (app: Application, opts?: object) => ProxyComponent;
  readonly pushScheduler: (
    app: Application,
    opts?: object
  ) => PushSchedulerComponent;
  readonly remote: (app: Application, opts?: object) => RemoteComponent;
  readonly server: (app: Application, opts?: object) => ServerComponent;
  readonly session: (app: Application, opts?: object) => SessionComponent;
};
export const backendSession: (app: Application) => BackendSessionService;
export const channel: (app: Application, opts?: object) => ChannelService;
export const connection: (app: Application) => ConnectionComponent;
export const connector: (app: Application, opts?: object) => ConnectorComponent;
export const dictionary: (
  app: Application,
  opts?: object
) => DictionaryComponent;
export const master: (app: Application, opts?: object) => MasterComponent;
export const monitor: (app: Application, opts?: object) => MonitorComponent;
export const protobuf: (app: Application, opts?: object) => ProtobufComponent;
export const proxy: (app: Application, opts?: object) => ProxyComponent;
export const pushScheduler: (
  app: Application,
  opts?: object
) => PushSchedulerComponent;
export const remote: (app: Application, opts?: object) => RemoteComponent;
export const server: (app: Application, opts?: object) => ServerComponent;
export const session: (app: Application, opts?: object) => SessionComponent;

export const filters: {
  readonly serial: (timeout: number) => HandlerFilter;
  readonly time: () => HandlerFilter;
  readonly timeout: (timeout?: number, maxSize?: number) => HandlerFilter;
  readonly toobusy: (maxLag: number) => HandlerFilter;
};
export const serial: (timeout: number) => HandlerFilter;
export const time: () => HandlerFilter;
export const timeout: (timeout?: number, maxSize?: number) => HandlerFilter;
export const toobusy: (maxLag: number) => HandlerFilter;

export const rpcFilters: {
  readonly rpcLog: () => RPCFilter;
  readonly toobusy: (maxLag: number) => RPCFilter;
};

export function createApp(opts?: object): Application;

export interface Application {
  init(opts: object): void;
  getBase(): string;
  require(ph: string): any;
  configureLogger(logger: object): void;
  filter(filter: object | Function): void;
  globalFilter(filter: object | Function): void;
  before(bf: object | Function): void;
  after(af: object | Function): void;
  globalBefore(bf: object | Function): void;
  globalAfter(af: object | Function): void;
  rpcBefore(bf: object | Function): void;
  rpcAfter(af: object | Function): void;
  rpcFilter(filter: object | Function): void;
  load(
    name: string | null,
    component: object | Function,
    opts?: object
  ): object;
  loadConfigBaseApp(key: string, val: string, reload: boolean): void;
  loadConfig(key: string, val: string): void;
  route(serverType: string, routeFunc: Function): Application;
  beforeStopHook(fun: Function): void;
  start(cb?: Function): void;
  afterStart(cb: Function): void;
  stop(force?: boolean): void;
  set(setting: string, val?: any, attach?: boolean): Application | any;
  get(key:'channelService'):ChannelService;
  get(key:'sessionService'):SessionService;
  get(setting: string): any;
  enabled(setting: string): boolean;
  disabled(setting: string): boolean;
  enable(setting: string): Application;
  disable(setting: string): Application;
  configure(env: string, type: string, fn: Function): Application;
  configure(env: string, fn: Function): Application;
  registerAdmin(moduleId: string, module: object, opts: object): void;
  use(plugin: { components: string }, opts: object): void;
  transaction(
    name: string,
    conditions: CallbackMap,
    handlers: CallbackMap,
    retry: number
  ): void;
  getMaster(): MasterInfo;
  readonly master:MasterInfo;
  getCurServer(): ServerInfo;
  getServerId(): string | number;
  getServerType(): string | number;
  getServers(): { [key: string]: ServerInfo };
  readonly servers:{ [key: string]: ServerInfo };
  getServersFromConfig(): { [key: string]: ServerInfo };
  getServerTypes(): Array<string | number>;
  getServerById(serverId: string | number): ServerInfo;
  getServerFromConfig(serverId: string | number): ServerInfo;
  getServersByType(serverType: string | number): Array<ServerInfo>;
  isFrontend(server?: ServerInfo): boolean;
  isBackend(server?: ServerInfo): boolean;
  isMaster(): boolean;
  addServers(servers: Array<ServerInfo>): void;
  removeServers(ids: Array<string | number>): void;
  replaceServers(servers: { [idx: string]: ServerInfo }): void;
  addCrons(crons: Array<any>): void;
  removeCrons(crons: Array<any>): void;
  channelService: ChannelService;
  backendSessionService: BackendSessionService;
  localSessionService: BackendSessionService;
  readonly event: EventEmitter;
}

export interface Connector extends EventEmitter {
  new (port: number, host: string, opts: object): Connector;
  start(cb: Function): void;
  stop(): void;
  close?(): void;
}

export interface CallbackMap {
  [name: string]: { (cb: Function): void };
}

export interface MasterInfo {
  id: string;
  host: string;
  port: number;
}

export interface ServerInfo {
  id: string;
  host: string;
  port: number;
  serverType?: string | number;
  frontend?: boolean | string;
  clientHost?: string;
  clientPort?: number;
}

export interface BackendSession {
  new (opts: object, service: BackendSessionService): BackendSession;
  bind(uid: number | string, cb: Function): void;
  unbind(uid: number | string, cb: Function): void;
  set(key: string, value: any): void;
  get(key: string): any;
  push(key: string, cb: Function): void;
  pushAll(cb: Function): void;
  export(): { [name: string]: any };
}

export interface BackendSessionService {
  readonly name: string;
  new (app: Application): BackendSessionService;
  create(opts: object): BackendSession;
  get(frontendId: string, sid: string, cb: Function): void;
  getByUid(frontendId: string, uid: string, cb: Function): void;
  kickBySid(frontendId: string, sid: string, reason: any, cb: Function): void;
  kickByUid(frontendId: string, uid: string, reason: any, cb: Function): void;
  bind(frontendId: string, sid: string, uid: string, cb: Function): void;
  unbind(frontendId: string, sid: string, uid: string, cb: Function): void;
  push(
    frontendId: string,
    sid: string,
    key: string,
    value: object,
    cb: Function
  ): void;
  pushAll(
    frontendId: string,
    sid: string,
    settings: object,
    cb: Function
  ): void;
}

export interface Channel {
  new (name: string, service: ChannelService): Channel;
  add(uid: number, sid: string): boolean;
  leave(uid: number, sid: string): boolean;
  getUserAmount(): number;
  getMembers(): Array<object>;
  getMember(uid: string): object;
  destroy(): void;
  pushMessage(route: string, msg: object, opts: object, cb: Function): void;
}

export interface ChannelService {
  new (app: Application, opts?: object): ChannelService;
  start(cb: Function): void;
  createChannel(name: string): Channel;
  getChannel(name: string, create: boolean): Channel;
  destroyChannel(name: string): void;
  pushMessageByUids(
    route: string,
    msg: object,
    uids: Array<{ uid: number; sid: string }>,
    opts: object,
    cb: Function
  ): void;
  broadcast(
    stype: string,
    route: string,
    msg: object,
    opts: object,
    cb: Function
  ): void;
}

export interface ConnectionService {
  addLoginedUser(uid: string, info: object): void;
  updateUserInfo(uid: string, info: object): void;
  increaseConnectionCount(): void;
  removeLoginedUser(uid: string): void;
  decreaseConnectionCount(): void;
  getStatisticsInfo(): {
    serverId: string;
    totalConnCount: number;
    loginedCount: number;
    loginedList: Array<string>;
  };
}

export interface ConnectionComponent extends ConnectionService {
  readonly name: string;
}

export interface ConnectorComponent {
  readonly name: string;
  start(cb: Function): void;
  afterStart(cb: Function): void;
  stop(force: boolean, cb: Function): void;
  send(
    reqId: number,
    route: string,
    msg: object,
    recvs: Array<string>,
    opts: object,
    cb: Function
  ): void;
  sendAsync(
    reqId: number,
    route: string,
    msg: object,
    recvs: Array<string>,
    opts: object,
    cb: Function
  ): void;
  doSend(
    reqId: number,
    route: string,
    msg: object,
    recvs: Array<string>,
    opts: object,
    cb: Function
  ): void;
  setPubKey(id: number | string, key: object): void;
  getPubKey(id: number | string): object;
}

export interface DictionaryComponent {
  readonly name: string;
  start(cb: Function): void;
  getDict(): object;
  getAbbrs(): object;
  getVersion(): string;
}

export interface MasterComponent {
  readonly name: string;
  start(cb: Function): void;
  stop(force: boolean, cb: Function): void;
}

export interface MonitorComponent {
  readonly name: string;
  start(cb: Function): void;
  stop(force: boolean, cb: Function): void;
  reconnect(masterInfo: MasterInfo): void;
}

export interface ProtobufComponent {
  readonly name: string;
  encode(key: string, msg: object): Buffer;
  encode2Bytes(key: string, msg: object): Uint8Array;
  decode(key: string, msg: Buffer | Uint16Array): object;
  getProtos(): { server: object; client: object; version: string };
  getVersion(): string;
  setProtos(type: "server" | "client", path: string): void;
}

export interface ProxyComponent {
  readonly name: string;
  start(cb: Function): void;
  afterStart(cb: Function): void;
  addServers(servers: Array<ServerInfo>): void;
  removeServers(ids: Array<string | number>): void;
  replaceServers(servers: Array<ServerInfo>): void;
  rpcInvoke(serverId: string | number, msg: object, cb: Function): void;
}

export interface PushSchedulerComponent {
  readonly name: string;
  afterStart(cb: Function): void;
  stop(force: boolean, cb: Function): void;
  schedule(
    reqId: number,
    route: string,
    msg: object,
    recvs: Array<string>,
    opts: object,
    cb: Function
  ): void;
}

export interface RemoteComponent {
  readonly name: string;
  start(cb: Function): void;
  stop(force: boolean, cb: Function): void;
}

export interface ServerComponent {
  readonly name: string;
  start(cb: Function): void;
  afterStart(cb: Function): void;
  stop(force: boolean, cb: Function): void;
  handle(msg: object, session: any, cb: Function): void;
}

export interface FrontendSession extends EventEmitter {
  bind(uid: number, cb: Function): void;
  unbind(uid: number, cb: Function): void;
  set(key: any, value: any): void;
  get(key: any): any;
  push(key: string | object, cb: Function): void;
  pushAll(cb: Function): void;
  export(): object;
}

export interface Session extends EventEmitter {
  toFrontendSession(): FrontendSession;
  bind(uid: number): void;
  bind(uid: number): void;
  set(key: string | object, value: any): void;
  remove(key: string | object): void;
  get(key: string | object): any;
  send(msg: object): void;
  sendBatch(msgs: Array<object>): void;
  closed(reason: string): void;
}

export interface SessionService {
  create(sid: number, frontendId: string, socket: Socket): Session;
  bind(sid: number, uid: number, cb: Function): void;
  unbind(sid: number, uid: number, cb: Function): void;
  get(sid: number): Session;
  getByUid(uid: number): Array<Session>;
  remove(sid: number): void;
  import(sid: number, key: string | object, value: object, cb: Function): void;
  importAll(sid: number, settings: object, cb: Function): void;
  kick(uid: number, reason: string, cb: Function): void;
  kickBySessionId(sid: number, reason: string, cb: Function): void;
  getClientAddressBySessionId(sid: number): string | null;
  sendMessage(sid: string, msg: object): boolean;
  sendMessageByUid(uid: string, msg: object): boolean | undefined;
  forEachSession(cb: Function): void;
  forEachBindedSession(cb: Function): void;
  getSessionsCount(): number;
}

export interface HandlerFilter {
  before(msg: object, session: Session, next: Function): void;
  after(
    err: string | object | null,
    msg: object,
    session: Session,
    next: Function
  ): void;
}
export interface RPCFilter {
  before(serverId: string, msg: object, opts: object, next: Function): void;
  after(serverId: string, msg: object, opts: object, next: Function): void;
}
export interface SessionComponent extends SessionService {
  readonly name: string;
}
export interface BufferPushScheduler {
  new(app:Application, opts?:object):this;
  start(cb?:Function):void;
  stop(force:boolean, cb?:Function):void;
  schedule(reqId:number, route:string, msg:object, recvs:Array<number|string>, opts?:object, cb?:Function):void;
}
export interface DirectPushScheduler {
  new(app:Application, opts?:object):this;
  schedule(reqId:number, route:string, msg:object, recvs:Array<number|string>, opts?:object, cb?:Function):void;
}