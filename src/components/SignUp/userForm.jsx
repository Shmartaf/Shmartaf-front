import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Button, DatePicker, Select, Checkbox } from "antd";
const { TextArea } = Input;
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { fetchNeeds, fetchSkills } from "../../api";
import { SignUp } from "../../api";
import { createSupabaseClient } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [form] = Form.useForm();
  const [isParent, setIsParent] = useState(false);
  const [isBabysitter, setIsBabysitter] = useState(false);
  const [needsData, setNeedsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [needsRating, setNeedsRating] = useState({});
  const navigate = useNavigate();
  const getNeedsData = async () => {
    try {
      const needs = await fetchNeeds();
      setNeedsData(needs);

      const intialValuesRating = {};
      needs.forEach((need) => {
        intialValuesRating[need.needname] = 3;
      });
      setNeedsRating(intialValuesRating);
    } catch (error) {
      console.error("Error fetching needs:", error);
    }
  };

  const getSkillsData = async () => {
    try {
      const skills = await fetchSkills();
      const skillsData = skills.map((skill) => ({
        id: skill.id,
        skillname: skill.skillname,
      }));
      setSkillsData(skillsData);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };
  const checkIsValid = () => {
    form.validateFields().then((values) => {
      //   if (values.email === undefined)
      //   {alert("Please select a valid email");
      //   return false;}
      //   if (values.password === undefined)
      //   {alert("Please select a passsword");
      //   return false;}
      //   if (values.fullName === undefined)
      //   {alert("Please select a full name");
      //   return false;}
      //   if (values.city === undefined)
      //   {alert("Please select a valid city");
      //   return false;}
      //   if (values.phone === undefined)
      //   {alert("Please select a valid phone number");
      //   return false;}
      //   if (values.gender === undefined)
      //   {alert("Please select a valid gender");
      //   return false;}
      //   if (values.userType === undefined)
      //   {alert("Please select a valid u");
      //   return false;}
      console.log("Received values of form: ", values);
      return true;
    });
  };

  const handleNeedRatingChange = (id, rating) => {
    setNeedsRating({ ...needsRating, [id]: rating });
  };

  useEffect(() => {
    getNeedsData();
    getSkillsData();
  }, []);

  const handleUserTypeChange = (value) => {
    setIsParent(value === "parent");
    setIsBabysitter(value === "babysitter");
  };

  const handleAddChild = () => {
    const children = form.getFieldValue("children") || [];
    form.setFieldsValue({
      children: [...children, { fullName: "", birthdate: "", needs: [] }],
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    //check if the form have undefined values
    if (Object.values(values).some((value) => value === undefined)) {
      alert("Please fill all the fields");
      return;
    }

    const supabase = createSupabaseClient();
    console.log("supabase:", supabase);
    const email = values.email;
    const password = values.password;
    const phone = values.phone;

    try {
      const new_user = await supabase.auth.signUp({
        email,
        password,
        phone,
      });
      if (new_user.error) {
        console.error("Error:", new_user.error);
        alert("error" + new_user.error);
        form.setFields([
          {
            name: new_user.error.name,
            status: new_user.error.status,
            message: new_user.error.message,
            stack: new_user.error.stack,
          },
        ]);
        return;
      }
      console.log("new_user:", new_user);
      values.id = new_user.data.user.id;
      values.needs = needsRating;
      console.log("Received values:", values);
      const response = await SignUp(values);
      console.log(response);
    } catch (error) {
      console.log("error:", error);
      alert("Error:", error);
    }
    navigate("/login");

    // Handle form submission logic here
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {/* User Details Section */}
      <Form.Item label="Full Name" name="fullName" required>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" required>
        <Input type="email" />
      </Form.Item>

      <Form.Item label="Password" name="password" required>
        <Input.Password />
      </Form.Item>

      <Form.Item label="City" name="city" required>
        <Input />
      </Form.Item>

      <Form.Item label="Street" name="street" required>
        <Input />
      </Form.Item>

      <Form.Item label="Gender" name="gender" required>
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Phone" name="phone" required>
        <Input />
      </Form.Item>
      <Form.Item label="User Type" name="userType" required>
        <Radio.Group onChange={(e) => handleUserTypeChange(e.target.value)}>
          <Radio value="parent">Parent</Radio>
          <Radio value="babysitter">Babysitter</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Parent Section */}
      {isParent && (
        <>
          <Form.Item
            label="Parent Description"
            name="parentDescription"
            required
          >
            <TextArea />
          </Form.Item>
          <Button
            type="dashed"
            onClick={() => {
              handleAddChild();
            }}
            icon={<PlusOutlined />}
          >
            Add Another Child
          </Button>
          {/* Children Section */}
          <Form.List name="children">
            {(fields, { remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>
                    <Form.Item
                      label={`Child ${
                        fields.length === 1 ? "" : key + 1
                      } Full Name`}
                      {...restField}
                      name={[name, "fullName"]}
                      fieldKey={[fieldKey, "fullName"]}
                      required
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label={`Child ${
                        fields.length === 1 ? "" : key + 1
                      } Birthdate`}
                      {...restField}
                      name={[name, "birthdate"]}
                      fieldKey={[fieldKey, "birthdate"]}
                      required
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                      label={`Child ${
                        fields.length === 1 ? "" : key + 1
                      } Needs`}
                      {...restField}
                      name={[name, "needs"]}
                      fieldKey={[fieldKey, "needs"]}
                      required
                    >
                      <Checkbox.Group>
                        {needsData.map((need) => (
                          <div key={need.id}>
                            <Checkbox value={need.id}>{need.needname}</Checkbox>
                            <Select
                              defaultValue={3} // Default rating
                              onChange={(value) =>
                                handleNeedRatingChange(need.id, value)
                              }
                            >
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <Select.Option key={rating} value={rating}>
                                  {rating}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label={`Child ${
                        fields.length === 1 ? "" : key + 1
                      } gender`}
                      {...restField}
                      name={[name, "gender"]}
                      fieldKey={[fieldKey, "gender"]}
                      required
                    >
                      <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                      </Select>
                    </Form.Item>

                    {/* Only show remove button if there are more than one child */}

                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        style={{ marginLeft: "8px" }}
                        icon={<MinusOutlined />}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </>
      )}

      {/* Babysitter Section */}
      {isBabysitter && (
        <>
          <Form.Item label="Babysitter Skills" name="babysitterSkills" required>
            <Checkbox.Group>
              {skillsData.map((skill) => (
                <Checkbox key={skill.id} value={[skill.id, skill.skillname]}>
                  {skill.skillname}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Babysitter Description"
            name="babysitterDescription"
            required
          >
            <TextArea />
          </Form.Item>
        </>
      )}

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="submitbutton">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
