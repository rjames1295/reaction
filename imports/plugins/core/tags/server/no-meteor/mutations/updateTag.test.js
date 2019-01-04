/* eslint-disable id-length */
import mockContext from "/imports/test-utils/helpers/mockContext";
import updateTag from "./updateTag";

const testShopId = "1234";
const testTagId = "5678";

beforeEach(() => {
  jest.resetAllMocks();
});

test("calls mutations.updateTag and returns the UpdateTagPayload on success", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(true);
  mockContext.collections.Tags.updateOne.mockReturnValueOnce({ result: { n: 1 } });
  mockContext.collections.Tags.findOne.mockReturnValueOnce({
    _id: "5678",
    shopId: "1234",
    isVisible: true,
    name: "shirts",
    displayTitle: "Shirts"
  });

  const input = {
    input: {
      shopId: testShopId,
      tagId: testTagId,
      isVisible: true,
      name: "shirts",
      displayTitle: "Shirts"
    }
  };
  const result = await updateTag(null, input, mockContext);

  expect(result.redirectRule).toBeDefined();
  expect(mockContext.collections.Tags.updateOne).toHaveBeenCalled();
});

test("calls mutations.updateTag, removes rule from skipper returns the UpdateTagPayload on success", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(true);
  mockContext.collections.Tags.updateOne.mockReturnValueOnce({ result: { n: 1 } });
  mockContext.collections.Tags.findOne.mockReturnValueOnce({
    _id: "5678",
    shopId: "1234",
    isVisible: false,
    name: "shirts",
    displayTitle: "Shirts"
  });

  const input = {
    input: {
      shopId: testShopId,
      tagId: testTagId,
      isVisible: false,
      name: "shirts",
      displayTitle: "Shirts"
    }
  };
  const result = await updateTag(null, input, mockContext);

  expect(result.redirectRule).toBeDefined();
  expect(mockContext.collections.Tags.updateOne).toHaveBeenCalled();
});

test("calls mutations.updateTag and throws for non admins", async () => {
  mockContext.userHasPermission.mockReturnValueOnce(false);
  mockContext.collections.Tags.updateOne.mockReturnValueOnce({ result: { n: 1 } });

  // await expect(redirectRules(null, {}, mockContext)).rejects.toThrowError(/User does not have permission/);
  const result = updateTag(null, {}, mockContext);
  expect(result).rejects.toThrowErrorMatchingSnapshot();
  expect(mockContext.collections.Tags.updateOne).not.toHaveBeenCalled();
});
