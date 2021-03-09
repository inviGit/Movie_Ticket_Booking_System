package com.edac.project.models.common;

public class ResponseResult {

    private Integer status;
    private String message;
    private Object object;

    public ResponseResult(Integer status, String message, Object object) {
        this.status = status;
        this.message = message;
        this.object = object;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
