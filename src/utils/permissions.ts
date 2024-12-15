// Utility type for Member to ensure consistency
type Member = { id: string };

// Helper to validate inputs and prevent runtime errors
const isValidId = (id: string | undefined): boolean => {
  return typeof id === "string" && id.trim() !== "";
};

// Check if the current user is the owner of the shopping list
export const isOwner = (listOwner: string | undefined, userId: string | undefined): boolean => {
  if (!isValidId(listOwner) || !isValidId(userId)) return false;
  return listOwner === userId;
};

// Check if the current user is a member of the shopping list
export const isMember = (members: Member[] | undefined, userId: string | undefined): boolean => {
  if (!Array.isArray(members) || !isValidId(userId)) return false;
  return members.some((member) => member.id === userId);
};

// Check if the user can leave the list (they must be a member but not the owner)
export const canLeaveList = (
  listOwner: string | undefined,
  members: Member[] | undefined,
  userId: string | undefined
): boolean => {
  return isMember(members, userId) && !isOwner(listOwner, userId);
};

// Unified function to check user ownership for a shopping list
export const userIsOwner = (
  userId: string | undefined,
  list: { owner: string } | undefined
): boolean => {
  if (!isValidId(userId) || !list || !isValidId(list.owner)) return false;
  return list.owner === userId;
};
