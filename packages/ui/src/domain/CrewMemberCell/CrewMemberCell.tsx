import { ResourceChip } from '../../components/Chips/Chips';
import s from './CrewMemberCell.module.css';
export interface CrewMember { id: string; name: string; role: string; equipment?: string; }
/** Row header for a person or a piece of equipment linked to an operator. One name format everywhere. */
export function CrewMemberCell({ member }: { member: CrewMember }) {
  return (
    <th scope="row" className={[s.cell, member.equipment && s.eq].filter(Boolean).join(' ')}>
      <span className={s.who}>
        {member.equipment ? <span className={s.eqname}><ResourceChip type="equipment" label={member.equipment} mono />{member.name}</span> : <b>{member.name}</b>}
        <span className={s.role}>{member.role}</span>
      </span>
    </th>
  );
}
