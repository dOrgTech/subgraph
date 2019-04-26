import 'allocator/arena';

import { Address, BigInt, store } from '@graphprotocol/graph-ts';

// Import event types from the Token contract ABI
import { DAORegistry, Propose, Register, UnRegister } from '../../types/DAORegistry/DAORegistry';
import { Avatar, Controller, Reputation, DAOToken } from "../../types/DAORegistry/templates";
import { Avatar as AvatarContract } from "../../types/Avatar/Avatar";

import * as domain from '../../domain';
import * as daoModule from "../../domain/dao";

export function handlePropose(event: Propose): void {
  domain.daoRegister(event.params._avatar, 'proposed');
}

export function handleRegister(event: Register): void {
  // TODO: this WIP and meant to serve as notes. Additional testing & research of
  // how this feature behaves is needed. Edge cases & open questions listed below.

  const contract = AvatarContract.bind(event.params._avatar);
  const avatarAddress = contract._address;
  const controllerAddress = contract.owner();
  const reputationAddress = contract.nativeReputation();
  const daoTokenAddress = contract.nativeToken();

  // These create calls tell GraphNode to watch these
  // contracts, and feed their events to these mappings
  Avatar.create(avatarAddress);
  Controller.create(controllerAddress);
  Reputation.create(reputationAddress);
  DAOToken.create(daoTokenAddress)

  // TODO: Open Questions
  // - Upon `create(...)`ing a new data source, will GraphNode process
  //   events that've happened in the past? If not, we'd be missing
  //   data as we're starting to watch them upon the dao being added
  //   to the registry.

  // TODO: this will not be needed if previous events are processed.
  //       This is because `handleRegisterScheme` will be called and
  //       the new DAO will be inserted.
  daoModule.insertNewDAO(
    avatarAddress,
    daoTokenAddress,
    reputationAddress
  );

  domain.daoRegister(avatarAddress, 'registered');
}

export function handleUnRegister(event: UnRegister): void {
  domain.daoRegister(event.params._avatar, 'unRegistered');
}
