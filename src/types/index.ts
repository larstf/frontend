export interface User {
  id: string,
  username: string,
  discriminator: number,
  avatar: string,
  avatar_url: string,
}

export interface Command {
  name: string,
  description: string,
}

export interface Permission {
  name: string,
  description: string,
}

export interface Bot {
  user: User,
  name: string,
  commands: Command[],
  permissions: Permission[],
  description: string,
  approximate_server_count?: number,
  isPrivate: boolean,
}